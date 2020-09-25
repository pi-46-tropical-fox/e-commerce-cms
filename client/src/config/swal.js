import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    timer: 3000,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const swal = {
    showToastSuccess: (message) => Toast.fire({ icon: 'success', title: message }),
    showSwalConfirm: async (message) => await Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }),
    showSwalError: (message) => Swal.fire('Oops!', message, 'error'),
}

export default swal