import photo1 from "../assets/img/photo1.jpg";
import photo2 from "../assets/img/photo2.jpg";
import Button from "../components/ui/Button";
import Feature from "../components/ui/CardFeature";
import "../styles/scss/landingPage.scss";

function LandingPage() {
  return (
    <main>
      <section>
        <h2 className="title">Fonctionnalités</h2>
        <div className="container">
          <div className="row">
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
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid">
            <div>
              <img src={photo1} alt="portrait d'un enfant" className="photo1" />
            </div>
            <div>
              <p className="text">Tes meilleurs moments,</p>
              <p className="text"> à portée de main,</p>
              <p className="text">pour toute la vie.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <p className="text">
            Pour commencer à créer des souvenirs c'est ici :
          </p>
          <br></br>
          <Button name="Get started"></Button>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid">
            <div>
              <p className="text">Crée un groupe, invite tes amis, </p>
              <p className="text"> et construisez ensemble un album unique.</p>
            </div>
            <div>
              <img src={photo2} alt="" className="photo2" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
