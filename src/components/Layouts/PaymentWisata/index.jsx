import React, { useState, useEffect, useRef } from "react";
import PaketWisataData from "../../Fragments/CardPaketWisata/PaketWisataData.json";

const PaymentPaketWisata = () => {
  const [nama, setNama] = useState("");
  const [selectedPaket, setSelectedPaket] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [totalNominal, setTotalNominal] = useState(0);
  const [selectedPaketPrice, setSelectedPaketPrice] = useState(0);
  const containerRef = useRef(null);
  const [jumlahOrang, setJumlahOrang] = useState(1);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setPaymentButtonsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    const paket = PaketWisataData.find((item) => item.title === selectedPaket);
    if (paket) {
      setSelectedPaketPrice(paket.price);
    } else {
      setSelectedPaketPrice(900000);
    }
  }, [selectedPaket]);

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleBayarSekarang = (e) => {
    e.preventDefault();
    if (nama !== "") {
      // Mengalikan nominal paket dengan jumlah orang
      const total = selectedPaketPrice * jumlahOrang;
      setTotalNominal(total);
      window.location.href = `/shop/paket-wisata/payment/status?nama=${nama}&nominal=${total}&metodePembayaran=${selectedPayment}`;
    } else {
      alert("Mohon isi nama Anda terlebih dahulu.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 sm:mt-24 mt-12 mb-12 px-8">
      <div className="lg:flex lg:grid lg:grid-cols-2 lg:gap-16 md:block">
        <div className="sm:bg-whte sm:shadow-xl sm:rounded-xl sm:p-12 mb-16 sm:mb-0 md:mb-16">
          <div className="img-payment mb-4">
            {/* Gambar paket wisata */}
            <img
              src="https://images.unsplash.com/photo-1496275068113-fff8c90750d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="rounded-xl mb-3"
              height={300}
            />
          </div>
          <div className="card-payment-detail p-4 bg-[#F5F6F8] rounded-3xl mb-16">
            {/* Informasi detail paket wisata */}
            <p className="text-xl font-bold mb-3 uppercase">
              Paket Wisata Jejak Lombok
            </p>
            <hr className="mb-4 border-gray-400" />
            <p className="text-base font-medium text-slate-900">
              Informasi Hotel :
            </p>
            <div className="flex gap-x-4 my-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12 text-sky-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                />
              </svg>{" "}
              <p className="text-sm text-[#6F6F6F] leading-loose">
                Gili Sudak Lombok Resort - Gili Sudak Jl. Jalan Dahlia no.1B
                Pelembak, Ampenan, Sekotong Barat, Lombok 83231 Indonesia
              </p>
            </div>
            <div className="bg-sky-700 rounded-3xl p-6 text-white mt-4 mb-[-60px]">
              {/* Harga paket wisata */}
              <p className="text-xl font-semibold mb-12">
                Rp. {selectedPaketPrice.toLocaleString()} / Orang
              </p>
              {/* Deskripsi tambahan */}
              <p className="text-sm text-gray-300">
                *Mohon untuk mengisi formulir terlebih dahulu dan baca deskripsi
                mengenai paket wisata yang Anda pilih.
              </p>
            </div>
          </div>
          <div className="desc-payment">
            <p className="mb-4 text-xl font-bold text-slate-900">
              Cara Pembayaran
            </p>
            <ol className="list-decimal ml-4 leading-loose text-gray-600 text-justify">
              <li>Isi terlebih dahulu data Anda berupa nama dan email.</li>
              <li>
                Pilih metode pembayaran yang nantinya anda gunakan untuk
                membayar.
              </li>
              <li>
                Setelah mengisi data dan memilih metode pembayaran, klik bayar
                sekarang dan transfer sesuai metode pembayaran dan nominal yang
                sudah Anda pilih.
              </li>
              <li>
                Setelah melakukan transaksi, refresh status dan cek email Anda.
              </li>
            </ol>
          </div>
        </div>
        {/* Form pembayaran */}
        <div className="relative mb-12">
          <div className="sticky top-20">
            <form action="" onSubmit={handleBayarSekarang}>
              {/* Input nama dan nomor telepon */}
              <div className="flex w-[100%] flex-col md:flex-row items-end gap-6 mb-8">
                <div className="w-full">
                  <label for="nama" className="font-medium">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="nama"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[20px] focus:ring-primary focus:border-primary block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-sky-700 tracking-wide leading-loose"
                    placeholder="Masukkan nama lengkap Anda"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label for="telepon" className="font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="telepon"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[20px] focus:ring-primary focus:border-primary block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-sky-700 tracking-wide leading-loose"
                    placeholder="Masukkan email Anda"
                  />
                </div>
              </div>
              <div className="flex w-[100%] flex-col md:flex-row items-end gap-6 mb-8">
                <div className="w-full sm:mb-8 mb-0">
                  <label htmlFor="tanggal" className="font-medium">
                    Tanggal Keberangkatan
                  </label>
                  <input
                    type="date"
                    id="tanggal"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[20px] focus:ring-primary focus:border-primary block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-sky-700 tracking-wide leading-loose"
                    // tambahkan value dan event handler jika diperlukan
                  />
                </div>
                <div className="w-full mb-8">
                  <label htmlFor="jumlahOrang" className="font-medium">
                    Jumlah Orang
                  </label>
                  <input
                    type="number"
                    id="jumlahOrang"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[20px] focus:ring-primary focus:border-primary block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-sky-700 tracking-wide leading-loose"
                    placeholder="0"
                    min={1}
                    value={jumlahOrang}
                    onChange={(e) => setJumlahOrang(e.target.value)}
                  />
                </div>
              </div>
              {/* Pilihan metode pembayaran */}
              <div className="w-full mb-8">
                <div className="font-medium mb-4">Metode Pembayaran</div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <button
                    type="button"
                    onClick={() => handlePaymentSelection("OVO")}
                    className={`h-[62px] md:h-[50px] text-gray-900 bg-white hover:bg-sky-700 focus:bg-sky-700 focus:text-white hover:text-white border border-gray-200 font-medium rounded-[20px] text-sm px-5 py-2.5 text-center inline-flex items-center md:mr-2 mb-2 ${
                      selectedPayment === "OVO" ? "bg-sky-700 text-white" : ""
                    }`}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png"
                      alt=""
                      width={36}
                      className="mr-4"
                    />
                    OVO
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePaymentSelection("GoPay")}
                    className={`h-[62px] md:h-[50px] text-gray-900 bg-white hover:bg-sky-700 focus:bg-sky-700 focus:text-white hover:text-white border border-gray-200 font-medium rounded-[20px] text-sm px-5 py-2.5 text-center inline-flex items-center md:mr-2 mb-2 ${
                      selectedPayment === "GoPay" ? "bg-sky-700 text-white" : ""
                    }`}
                  >
                    <img
                      src="https://www.pointstar-consulting.com/wp-content/uploads/2022/02/gopay-integration.png"
                      alt=""
                      width={36}
                      className="mr-4"
                    />
                    GoPay
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePaymentSelection("QRIS")}
                    className={`h-[62px] md:h-[50px] text-gray-900 bg-white hover:bg-sky-700 focus:bg-sky-700 focus:text-white hover:text-white border border-gray-200 font-medium rounded-[20px] text-sm px-5 py-2.5 text-center inline-flex items-center md:mr-2 mb-2 ${
                      selectedPayment === "QRIS" ? "bg-sky-700 text-white" : ""
                    }`}
                  >
                    <img
                      src="https://seeklogo.com/images/Q/quick-response-code-indonesia-standard-qris-logo-F300D5EB32-seeklogo.com.png"
                      alt=""
                      width={36}
                      className="mr-4"
                    />
                    QRIS
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePaymentSelection("VISA")}
                    className={`h-[62px] md:h-[50px] text-gray-900 bg-white hover:bg-sky-700 focus:bg-sky-700 focus:text-white hover:text-white border border-gray-200 font-medium rounded-[20px] text-sm px-5 py-2.5 text-center inline-flex items-center md:mr-2 mb-2 ${
                      selectedPayment === "VISA" ? "bg-sky-700 text-white" : ""
                    }`}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                      alt=""
                      width={36}
                      className="mr-4"
                    />
                    VISA
                  </button>
                  {/* Tambahkan tombol pembayaran lainnya di sini */}
                </div>
              </div>
              {/* Tombol Bayar Sekarang */}
              <div className="w-full">
                <button
                  type="submit"
                  className="middle none center w-full h-[60px] rounded-[99px] bg-sky-700 py-3 px-6 text-base font-semibold text-white transition-all border border-transparent transition duration-300 hover:bg-white hover:border-sky-700 hover:text-sky-700"
                >
                  Bayar Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPaketWisata;
