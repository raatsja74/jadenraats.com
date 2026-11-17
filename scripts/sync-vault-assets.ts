import { cp, mkdir, rm, stat } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";

import { getVaultAssetSources } from "../src/lib/vault/catalog";

const projectRoot = resolve(process.cwd());
const publicRoot = resolve(projectRoot, "public");
const generatedAssetsRoot = resolve(publicRoot, "assets", "vault");

async function syncVaultAssets(): Promise<void> {
  // This guard makes the recursive clean target explicit and impossible to widen by accident.
  if (relative(publicRoot, generatedAssetsRoot) !== `assets${sep}vault`) {
    throw new Error("Refusing to clear an unexpected generated asset directory.");
  }

  const configuredVaultPath = process.env.OBSIDIAN_VAULT_PATH?.trim();
  if (!configuredVaultPath) {
    await rm(generatedAssetsRoot, { force: true, recursive: true });
    console.log("Vault asset sync disabled. Cleared generated assets.");
    return;
  }

  const vaultPath = resolve(configuredVaultPath);
  if (!(await isDirectory(vaultPath))) {
    throw new Error("OBSIDIAN_VAULT_PATH is not a usable directory.");
  }

  await rm(generatedAssetsRoot, { force: true, recursive: true });

  const assets = getVaultAssetSources({ vaultPath });
  for (const asset of assets) {
    const outputPath = resolve(generatedAssetsRoot, asset.outputRelativePath);
    if (!isContained(generatedAssetsRoot, outputPath)) {
      throw new Error("Refusing to write a vault asset outside its generated directory.");
    }

    await mkdir(dirname(outputPath), { recursive: true });
    await cp(asset.sourcePath, outputPath);
  }

  console.log(`Vault asset sync complete: ${assets.length} file(s).`);
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

function isContained(root: string, candidate: string): boolean {
  const pathFromRoot = relative(root, candidate);
  return (
    pathFromRoot === "" ||
    (!pathFromRoot.startsWith(`..${sep}`) &&
      pathFromRoot !== ".." &&
      !isAbsolute(pathFromRoot))
  );
}

syncVaultAssets().catch((error: unknown) => {
  console.error("Vault asset sync failed.", error);
  process.exitCode = 1;
});
