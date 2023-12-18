import { toast } from '@zerodevx/svelte-toast';
import ConfirmDialog from '$lib/misc/ConfirmDialog.svelte';

export const successToast = message => toast.push(message, {
  duration: 3000,
  theme: {
    '--toastColor': 'mintcream',
    '--toastBackground': 'rgba(72,187,120,0.9)',
    '--toastBarBackground': '#2F855A',
    '--toastBarHeight': 0,
    '--toastBoxShadow': '15px 15px 15px 0 black'
  }
});

export const errorToast = message => toast.push(message, {
  duration: 3000,
  theme: {
    '--toastBackground': '#F25E5E',
    '--toastColor': 'white',
    '--toastBarHeight': 0,
    '--toastBoxShadow': '15px 15px 15px 0 black'
  }
});


export const infoToast = message => toast.push(message, {
  duration: 3000,
  theme: {
    '--toastBackground': '#3783F9',
    '--toastColor': 'white',
    '--toastBarHeight': 0,
    '--toastBoxShadow': '15px 15px 15px 0 black'
  }
});

export const confirmDialog = ( message, confirm, deny, dismiss = false ) => {
    toast.push({
      component: {
        src: ConfirmDialog,
        props: {
          message: message,
          callbackConfirm: confirm,
          callbackDeny: deny,
        }
      },
      dismissable: dismiss,
      initial: 0,
      theme: {
        '--toastBackground': '#1f2a2d',
        '--toastColor': 'white',
        '--toastBarHeight': '0',
        '--toastBoxShadow': '15px 15px 15px 0 black'
      },
    });
}
