document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.exp-card');
    const modal = document.getElementById('project-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeModalBtn = document.getElementById('close-modal');
    const modalContentBox = document.getElementById('modal-content-box');

    // Elemen teks dan gambar di dalam modal
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalDesc = document.getElementById('modal-desc');

    // Fungsi Buka Modal
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Ambil data dari atribut HTML kartu yang diklik
            const title = card.getAttribute('data-title');
            const date = card.getAttribute('data-date');
            const desc = card.getAttribute('data-desc');
            const img = card.getAttribute('data-img');

            // Masukkan data ke dalam Modal
            modalTitle.textContent = title;
            modalDate.textContent = date;
            modalDesc.textContent = desc;
            modalImg.src = img;

            // Tampilkan Modal
            modal.classList.remove('hidden');
            
            // Sedikit delay untuk memicu animasi CSS scale & opacity
            setTimeout(() => {
                modal.classList.add('modal-active');
            }, 10);
            
            // Kunci scroll di halaman utama agar tidak bisa discroll saat pop-up terbuka
            document.body.style.overflow = 'hidden';
        });
    });

    // Fungsi Tutup Modal
    const closeModal = () => {
        modal.classList.remove('modal-active');
        
        // Tunggu animasi selesai baru sembunyikan sepenuhnya
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Kembalikan scroll
        }, 300); // 300ms sesuai kecepatan transisi Tailwind
    };

    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Tutup dengan tombol ESC di keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});