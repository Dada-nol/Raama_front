import photo1 from "../assets/img/photo1.jpg";
import photo2 from "../assets/img/photo2.jpg";
import BackToTop from "../components/ui/BackToTop";
import Button from "../components/ui/Button";
import Feature from "../components/ui/CardFeature";

function LandingPage() {
  return (
    <main className="relative">
      {/* Features */}
      <section className="flex flex-col justify-center items-center gap-8 mt-4">
        <h2 className="title font-bold text-[25px] text-gradient">
          Fonctionnalités
        </h2>
        <div className="flex justify-evenly items-center bg-secondary w-full p-6">
          <Feature
            icon="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"
            description="Privacy first"
          ></Feature>
          <Feature
            icon="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"
            description="Group sharing"
          ></Feature>
          <Feature
            icon="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"
            description="High-Quality Photo"
          ></Feature>
        </div>
      </section>

      {/* Photos superposées */}
      <section className="relative flex items-center justify-center px-4 py-16 overflow-hidden">
        {/* Halo vert */}
        <div className="absolute w-[600px] h-[600px] bg-[#64B000] rounded-full blur-[120px] opacity-30  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

        <div className="flex items-center max-w-6xl">
          <div className="relative w-[300px] h-[400px]">
            <img
              src={photo1}
              alt="photo1"
              className="absolute top-0 left-0 w-full h-full object-cover rotate-[12deg] border-2 border-white shadow-xl"
            />
            <img
              src={photo1}
              alt="photo2"
              className="absolute top-8 left-8 w-full h-full object-cover rotate-[12deg] border-2 border-white shadow-lg z-10"
            />
          </div>

          <div className="w-[500px] bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-[0_0_10px_2px_rgba(255,255,255,0.1)] text-white">
            <p className="text-2xl font-semibold leading-relaxed text-center">
              Tes meilleurs moments,
              <br />
              à portée de main, pour
              <br />
              toute la vie.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-secondary">
        <div className="flex justify-evenly items-center p-10">
          <p className="text-xl font-semibold leading-relaxed">
            Pour commencer à créer des souvenirs c'est ici :
          </p>
          <a
            className="text-md hover:scale-105 inline-block transition-transform duration-300 hover:scale-140 gradient-border p-4"
            href="/register"
          >
            <Button name="Get started" />
          </a>
        </div>
      </section>

      {/* Photo */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 m-20 content-center justify-items-center border border-white rounded-lg p-8 border-white/10 shadow-[0_0_10px_2px_rgba(255,255,255,0.1)]">
          <div className="flex items-center">
            <p className="text-2xl font-semibold leading-relaxed text-center">
              Crée un groupe, invite tes amis,
              <br></br>
              et construisez ensemble un album unique.
            </p>
          </div>
          <div>
            <img
              src={photo2}
              alt=""
              className="w-[500px] h-auto object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <BackToTop></BackToTop>
    </main>
  );
}

export default LandingPage;
