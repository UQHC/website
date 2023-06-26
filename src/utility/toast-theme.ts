import { toast } from '@zerodevx/svelte-toast'

export const success = (m: string) => toast.push(m, {
  theme: {
    '--toastBackground': 'rgb(55 65 81)',
    '--toastColor': 'white',
    '--toastBarBackground': '#3bb1b6',
    '--toastBorderRadius': '3px'
  }
})

export const warning = (m: string) => toast.push(m, {
  theme: {
    '--toastBackground': 'rgb(31 41 55)',
    '--toastColor': 'white',
    '--toastBarBackground': '#e96a3a',
    '--toastBorderRadius': '3px'
  }
})

export const failure = (m: string) => toast.push(m, {
  theme: {
    '--toastBackground': 'green',
    '--toastColor': 'white',
    '--toastBarBackground': 'olive'
  }
})

export const info = (m: string) => toast.push(m, {
  theme: {
    '--toastBackground': 'green',
    '--toastColor': 'white',
    '--toastBarBackground': 'olive'
  }
})
