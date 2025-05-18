import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight'>SETTINGS</h1>
        <p className='text-lg text-muted-foreground'>
          Manage your app preferences and account settings.
        </p>
      </div>

      <div className='space-y-6'>
        {/* Appearance Settings */}
        <div className='rounded-lg border-2 border-black p-6'>
          <h2 className='text-2xl font-bold'>Appearance</h2>
          <p className='text-muted-foreground'>
            Customize how ZenWallet looks on your device
          </p>

          <div className='mt-6 space-y-6'>
            <div className='space-y-3'>
              <Label htmlFor='theme'>Theme</Label>
              <RadioGroup defaultValue='light' className='flex gap-4'>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='light' id='theme-light' />
                  <Label htmlFor='theme-light'>Light</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='dark' id='theme-dark' />
                  <Label htmlFor='theme-dark'>Dark</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='system' id='theme-system' />
                  <Label htmlFor='theme-system'>System</Label>
                </div>
              </RadioGroup>
            </div>

            <div className='space-y-3'>
              <Label htmlFor='language'>Language</Label>
              <Select defaultValue='en'>
                <SelectTrigger className='w-full md:w-[240px] border-2 border-black'>
                  <SelectValue placeholder='Select language' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='en'>English</SelectItem>
                  <SelectItem value='es'>Spanish</SelectItem>
                  <SelectItem value='fr'>French</SelectItem>
                  <SelectItem value='de'>German</SelectItem>
                  <SelectItem value='zh'>Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-3'>
              <Label htmlFor='timezone'>Timezone</Label>
              <Select defaultValue='utc-5'>
                <SelectTrigger className='w-full md:w-[240px] border-2 border-black'>
                  <SelectValue placeholder='Select timezone' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='utc-8'>Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value='utc-7'>Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value='utc-6'>Central Time (UTC-6)</SelectItem>
                  <SelectItem value='utc-5'>Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value='utc+0'>UTC</SelectItem>
                  <SelectItem value='utc+1'>
                    Central European Time (UTC+1)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className='rounded-lg border-2 border-black p-6'>
          <h2 className='text-2xl font-bold'>Notifications</h2>
          <p className='text-muted-foreground'>
            Configure how and when you receive notifications
          </p>

          <div className='mt-6 space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='email-notifications' className='text-base'>
                  Email Notifications
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Receive updates via email
                </p>
              </div>
              <Switch id='email-notifications' defaultChecked />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='push-notifications' className='text-base'>
                  Push Notifications
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Receive notifications on your device
                </p>
              </div>
              <Switch id='push-notifications' defaultChecked />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='transaction-alerts' className='text-base'>
                  Transaction Alerts
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Get notified about new transactions
                </p>
              </div>
              <Switch id='transaction-alerts' defaultChecked />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='marketing-emails' className='text-base'>
                  Marketing Emails
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Receive promotional content and offers
                </p>
              </div>
              <Switch id='marketing-emails' />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='security-alerts' className='text-base'>
                  Security Alerts
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Get notified about security events
                </p>
              </div>
              <Switch id='security-alerts' defaultChecked />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className='rounded-lg border-2 border-black p-6'>
          <h2 className='text-2xl font-bold'>Privacy</h2>
          <p className='text-muted-foreground'>
            Manage your data and privacy preferences
          </p>

          <div className='mt-6 space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='data-collection' className='text-base'>
                  Data Collection
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Allow anonymous usage data collection
                </p>
              </div>
              <Switch id='data-collection' defaultChecked />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='personalization' className='text-base'>
                  Personalization
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Customize your experience based on usage
                </p>
              </div>
              <Switch id='personalization' defaultChecked />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='third-party' className='text-base'>
                  Third-Party Sharing
                </Label>
                <p className='text-sm text-muted-foreground'>
                  Share data with trusted partners
                </p>
              </div>
              <Switch id='third-party' />
            </div>
          </div>

          <div className='mt-6'>
            <Button variant='outline' className='border-2 border-black'>
              Download My Data
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <div className='flex justify-end'>
          <Button className='bg-black text-white hover:bg-black/90'>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
