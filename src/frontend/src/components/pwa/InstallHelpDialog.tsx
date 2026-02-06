import { Smartphone, Monitor, Apple } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InstallHelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InstallHelpDialog({ open, onOpenChange }: InstallHelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gray-900 border-pink-700/50 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-xl text-pink-400">How to Install App</DialogTitle>
          <DialogDescription className="text-gray-400">
            Follow these steps to install the app on your device
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="android" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="android" className="data-[state=active]:bg-pink-600">
              <Smartphone className="w-4 h-4 mr-1" />
              Android
            </TabsTrigger>
            <TabsTrigger value="ios" className="data-[state=active]:bg-pink-600">
              <Apple className="w-4 h-4 mr-1" />
              iOS
            </TabsTrigger>
            <TabsTrigger value="desktop" className="data-[state=active]:bg-pink-600">
              <Monitor className="w-4 h-4 mr-1" />
              Desktop
            </TabsTrigger>
          </TabsList>

          <TabsContent value="android" className="space-y-4 mt-4">
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p className="text-gray-300">
                  Open this website in <span className="font-semibold text-white">Chrome</span> or <span className="font-semibold text-white">Samsung Internet</span>
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p className="text-gray-300">
                  Tap the <span className="font-semibold text-white">three dots menu</span> (⋮) in the top right corner
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p className="text-gray-300">
                  Select <span className="font-semibold text-white">"Add to Home screen"</span> or <span className="font-semibold text-white">"Install app"</span>
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <p className="text-gray-300">
                  Tap <span className="font-semibold text-white">"Install"</span> or <span className="font-semibold text-white">"Add"</span> to confirm
                </p>
              </div>
            </div>
            
            <div className="bg-pink-900/20 border border-pink-700/30 rounded-lg p-3 mt-4">
              <p className="text-xs text-gray-400">
                The app will appear on your home screen and can be opened like any other app.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="ios" className="space-y-4 mt-4">
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p className="text-gray-300">
                  Open this website in <span className="font-semibold text-white">Safari</span> (required for iOS)
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p className="text-gray-300">
                  Tap the <span className="font-semibold text-white">Share button</span> (square with arrow pointing up) at the bottom of the screen
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p className="text-gray-300">
                  Scroll down and tap <span className="font-semibold text-white">"Add to Home Screen"</span>
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <p className="text-gray-300">
                  Tap <span className="font-semibold text-white">"Add"</span> in the top right corner
                </p>
              </div>
            </div>
            
            <div className="bg-pink-900/20 border border-pink-700/30 rounded-lg p-3 mt-4">
              <p className="text-xs text-gray-400">
                <span className="font-semibold text-pink-400">Note:</span> This only works in Safari browser on iPhone and iPad.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="desktop" className="space-y-4 mt-4">
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p className="text-gray-300">
                  Open this website in <span className="font-semibold text-white">Chrome</span> or <span className="font-semibold text-white">Edge</span>
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p className="text-gray-300">
                  Look for the <span className="font-semibold text-white">install icon</span> (⊕ or computer with arrow) in the address bar
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p className="text-gray-300">
                  Click the icon and select <span className="font-semibold text-white">"Install"</span>
                </p>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 mt-3">
                <p className="text-xs text-gray-400 mb-2 font-semibold">Alternative method:</p>
                <p className="text-xs text-gray-400">
                  Click the <span className="font-semibold text-white">three dots menu</span> (⋮) → <span className="font-semibold text-white">"Install App"</span> or <span className="font-semibold text-white">"Create shortcut"</span>
                </p>
              </div>
            </div>
            
            <div className="bg-pink-900/20 border border-pink-700/30 rounded-lg p-3 mt-4">
              <p className="text-xs text-gray-400">
                The app will open in its own window and appear in your applications menu.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
