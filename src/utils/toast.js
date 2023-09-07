import { toast } from '@zerodevx/svelte-toast';

export const success = message => toast.push(message, {
  duration: 3000,
  theme: {
    '--toastColor': 'mintcream',
    '--toastBackground': 'rgba(72,187,120,0.9)',
    '--toastBarBackground': '#2F855A',
    '--toastBarHeight': 0
  }
});

export const error = message => toast.push(message, {
  duration: 3000,
  theme: {
    '--toastBackground': '#F25E5E',
    '--toastColor': 'white',
    '--toastBarHeight': 0
  }
});


export const info = message => toast.push(message, {
  duration: 3000,
  theme: {
    '--toastBackground': '#3783F9',
    '--toastColor': 'white',
    '--toastBarHeight': 0
  }
});
