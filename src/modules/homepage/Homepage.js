
import Card from "@/components/homepage/Card";


export default function Homepage() {
  return (
    <div className="pt-[100px] min-h-screen bg-white">


      {/* HERO SECTION */}
      <div className="h-auto w-full bg-center bg-cover bg-[url('/assets/homepage/heroimage.png')] px-6 py-16 md:py-32 lg:px-20">
        <p className="text-[#112456] text-xl text-center w-1/2 md:text-2xl font-bold font-adlam-display-regular bg-[url('/assets/homepage/bluetext.png')] bg-contain bg-no-repeat bg-center pb-8">
          Welcome to PELITA!
        </p>


        <p className="text-[#112456] text-4xl md:text-5xl font-bold mt-4 font-adlam-display-regular">
          Temani Tumbuh Bahagia! 🌼
        </p>


        <p className="text-[#112456] text-base md:text-lg mt-6 font-adlam-display-regular md:w-1/2 w-full">
          PELITA hadir agar orang tua bisa memantau aktivitas anak di taman
          kanak-kanak secara mudah dan menyenangkan. Ciptakan pengalaman
          pendidikan yang penuh perhatian dan kasih sayang.
        </p>
        <div className="flex justify-center w-1/2">
          <a className="mt-8 w-fit bg-[#F5BBD4] text-white px-6 py-3 rounded-xl text-sm md:text-2xl font-adlam-display-regular hover:bg-[#e65c7f] transition flex  justify-center items-center"
            href="/register"
          >
            Mulai Sekarang →
          </a>
        </div>
      </div>


      {/* SECTION TITLE */}
      <div className="text-[#112456] text-xl md:text-3xl font-adlam-display-regular flex flex-col items-center mt-10">
        <div className="relative w-64 md:w-80">
          <img src="/assets/homepage/pinktext.png" className="scale-120 mx-auto" alt="" />
          <span className="absolute inset-0 flex items-center justify-center  ">
            Discover Our Feature
          </span>
        </div>


        <div className="relative w-48 md:w-60 mt-1">
          <img src="/assets/homepage/orangetext.png" className="w-5/6 mx-auto" alt="" />
          <span className="absolute inset-0 flex items-center justify-center ">
            on PELITA
          </span>
        </div>
      </div>
     
       


      {/* FEATURE CARDS */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-36 mt-10 px-4">
        <Card
          title="Monitoring"
          subtitle="Pantau aktivitas anak harian"
          image="/assets/homepage/monitoringdino.png"
          bgColor="#FA9EB7"
        />


        <Card
          title="Reminder"
          subtitle="Pengingat jadwal dan kegiatan"
          image="/assets/homepage/reminderdino.png"
          bgColor="#44B3E0"
        />


        <Card
          title="Communication"
          subtitle="Hubungkan guru dengan orang tua"
          image="/assets/homepage/communicationdino.png"
          bgColor="#FDC564"
        />
      </div>


      {/* WHY SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left mt-20 px-6 py-20 gap-10 bg-[url('/assets/homepage/bluearea.png')] bg-cover bg-center">
       
        <img
          src="/assets/homepage/blueimage.png"
          className="h-40 md:h-64 lg:h-100"
          alt=""
        />


        <div className="text-[#112456] max-w-md">
          <p className="text-2xl md:text-4xl font-farro-bold mb-6">
            Why is this Important?
          </p>


          <p className="text-sm md:text-base font-farro-regular">
            Anak-anak berkembang dengan lebih baik ketika orang tua terlibat
            aktif dalam proses belajar mereka. <br /><br />
            Dengan PELITA Web App, orang tua dapat memantau aktivitas anak
            secara real-time, melihat laporan perkembangan, berkomunikasi
            langsung dengan guru, serta menerima pengingat penting dengan
            mudah di tengah kesibukan Anda. <br /><br />
            Semua dalam satu platform.
          </p>
        </div>
      </div>
    </div>
  );
}
