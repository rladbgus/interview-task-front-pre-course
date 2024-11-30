import Swal from 'sweetalert2';

export const alertInfo = (message: string) => {
  Swal.fire({
    icon: 'info',
    text: message
  });
};
