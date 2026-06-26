 // 5-Minutes Countdown Timer
        function startTimer(duration, displayMin, displaySec) {
            let timer = duration, minutes, seconds;
            setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                displayMin.textContent = minutes;
                displaySec.textContent = seconds;

                if (--timer < 0) {
                    timer = duration; 
                }
            }, 1000);
        }

        window.onload = function () {
            let fiveMinutes = 60 * 5,
                displayMin = document.querySelector('#timer-min'),
                displaySec = document.querySelector('#timer-sec');
            startTimer(fiveMinutes, displayMin, displaySec);
        };

        // Modal Functionality
        let selectedProduct = "";
        let selectedPrice = "";

        function openPayment(name, price) {
            selectedProduct = name;
            selectedPrice = price;
            
            document.getElementById('modal-product-name').textContent = name;
            document.getElementById('modal-product-price').textContent = price;

            // Pastikan body tidak bisa di-scroll saat modal terbuka (UX lebih baik)
            document.body.style.overflow = 'hidden';

            const modal = document.getElementById('payment-modal');
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.querySelector('div').classList.remove('scale-95');
            }, 10);
        }

        function closePayment() {
            const modal = document.getElementById('payment-modal');
            modal.classList.add('opacity-0');
            modal.querySelector('div').classList.add('scale-95');
            setTimeout(() => {
                modal.classList.add('hidden');
                // Kembalikan scroll body
                document.body.style.overflow = '';
            }, 300);
        }

        // Copy Account Number
        function copyAccount() {
            const accNum = document.getElementById('acc-num').textContent;
            navigator.clipboard.writeText(accNum).then(() => {
                alert('Nomor Rekening BCA berhasil disalin!');
            });
        }

        // Redirect to WhatsApp
        function redirectToWhatsApp() {
            const phoneNumber = "6285733390830"; 
            const textMessage = `Halo Lucky Proxy, saya ingin membeli produk berikut:\n\n` +
                                `• Produk: ${selectedProduct}\n` +
                                `• Harga: ${selectedPrice}\n\n` +
                                `Berikut saya lampirkan bukti transfer pembayaran via Bank BCA ke Rekening a/n Tri Afriansyah. Mohon segera diproses ya, terima kasih!`;
            
            const encodedMessage = encodeURIComponent(textMessage);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        }

        window.onclick = function(event) {
            const modal = document.getElementById('payment-modal');
            if (event.target == modal) {
                closePayment();
            }
        }