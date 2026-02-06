import { usePwaInstall } from '../../pwa/usePwaInstall';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function PwaDiagnosticsPanel() {
  const {
    isStandalone,
    hasServiceWorkerController,
    beforeInstallPromptCaptured,
    manifestUrl,
    isIOS,
  } = usePwaInstall();

  const diagnosticItems = [
    {
      label: 'Standalone Mode',
      value: isStandalone,
      description: 'App is running in standalone mode (installed)',
    },
    {
      label: 'Service Worker Controller',
      value: hasServiceWorkerController,
      description: 'Page is controlled by service worker',
    },
    {
      label: 'Install Prompt Captured',
      value: beforeInstallPromptCaptured,
      description: 'beforeinstallprompt event was captured',
    },
    {
      label: 'iOS Device',
      value: isIOS,
      description: 'Running on iOS device',
    },
  ];

  return (
    <Card className="fixed bottom-4 right-4 w-80 max-w-[calc(100vw-2rem)] bg-black/90 border-rose-500/30 text-white z-50 shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-rose-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          PWA Diagnostics (Dev Only)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        {diagnosticItems.map((item) => (
          <div key={item.label} className="flex items-start gap-2 p-2 rounded bg-white/5">
            {item.value ? (
              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white">{item.label}</div>
              <div className="text-gray-400 text-[10px] leading-tight mt-0.5">
                {item.description}
              </div>
            </div>
          </div>
        ))}
        
        {manifestUrl && (
          <div className="p-2 rounded bg-white/5 mt-2">
            <div className="font-medium text-white mb-1">Manifest URL</div>
            <div className="text-gray-400 text-[10px] break-all leading-tight">
              {manifestUrl}
            </div>
          </div>
        )}

        <div className="pt-2 mt-2 border-t border-rose-500/20 text-[10px] text-gray-500">
          Check DevTools → Application → Manifest & Service Workers for more details
        </div>
      </CardContent>
    </Card>
  );
}
