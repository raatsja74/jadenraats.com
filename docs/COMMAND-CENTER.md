# Agent Command Center

Public entry page: https://jadenraats.com/command-center

Private application: https://jadens-macbook-pro.tail6a4c43.ts.net:8443/kanban

Connect to Tailscale and use the existing Hermes dashboard login. The site page contains no credentials, public agent endpoints, or exported task/session data. It is unlisted and noindex; that is discoverability control, not authentication. Hermes enforces authentication on the private host.

## Architecture

The page opens the existing Hermes dashboard, with an optional user-initiated iframe. Hermes Kanban is the existing execution queue; its workers and gateway run tasks. Sessions, profiles, schedules, run logs, and requests for input remain in Hermes. No second task database or agent runtime was introduced. This execution queue does not replace CaptureVault's planning/task records.

The full-window dashboard is the supported sign-in path. Private-network permissions and cross-site cookie restrictions may prevent inline use. If the frame cannot connect or retain login, use **Open private dashboard**. Nothing is proxied through Vercel.

## Host and service

Host: `jadens-macbook-pro` over SSH. Native listener: `127.0.0.1:9119`. The existing Tailscale HTTPS route on port 8443 serves it; the root Tailscale URL remains the separate API service.

LaunchAgent: `~/Library/LaunchAgents/com.jadenraats.hermes-dashboard.plist`.

```sh
launchctl print gui/$(id -u)/com.jadenraats.hermes-dashboard
launchctl kickstart -k gui/$(id -u)/com.jadenraats.hermes-dashboard
```

It runs the stable `~/.local/bin/hermes dashboard` launcher with `--host 127.0.0.1 --port 9119 --no-open --skip-build`, RunAtLoad and KeepAlive. Logs are in `~/.hermes/logs/dashboard-service{,.error}.log`. Prebuilt native dashboard assets must remain installed. A LaunchAgent starts in the user's login session; after reboot the owner must log in. It is not a system daemon and cannot serve while the Mac is asleep/offline.

Existing username/password settings and session secret were preserved. Reset a forgotten password with the native Hermes auth configuration, not in this repository. Never commit credentials or session state.

## Verified 2026-10-01

- Owner session can read Kanban, assignees, active workers, and schedules.
- A bounded verification task assigned to `default` reached Done and returned `COMMAND_CENTER_SMOKE_OK`; its final result, worker log, and run history were visible in the UI.
- A launchd restart changed the dashboard PID. The signed-in QA session, completed task, and output survived.
- Unauthenticated dashboard requests redirect to sign-in; protected API requests return 401.
- Site lint, TypeScript, design check, and production build pass. Responsive widths: 320, 375, 390, 430, 768, and 1440px. Inline reload/close, Escape, restored focus, skip link, and theme switching were browser-tested.
- The positive auth test used a temporary owner QA session, not a plaintext password test. Password settings were not changed.

## Existing limitations

Only `default` and `orchestrator` are installed profiles on this host. Hermes reports that `orchestrator` shares the default Telegram credential and its adapter is parked. Historical Kanban assignees are not proof that those profiles exist. This recovery did not recreate missing profiles, change Telegram routing, unblock old tasks, or claim every historical agent is operational. Task execution was verified with `default`.

The MBP Codex default model is `gpt-6.1-sol`. Its original config was backed up before the single-line change. No Codex app-server processes were killed.

## Release discipline

This page was isolated from unrelated dirty site checkouts, based on the verified production source. Keep the page and this runbook on the production branch so later site releases retain the entrance. Do not add it to the public sitemap/navigation without a deliberate privacy decision. No service credentials belong in the site's environment variables.
