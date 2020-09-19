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
    showSwalError: (message) => Swal.fire('Oops!', message, 'error'),
}

export default swal