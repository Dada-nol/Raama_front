import logo from "../../assets/img/logo.png";

export default function Logo({ width }) {
  return (
    <div>
      <img src={logo} alt="Pandaraama" style={{ width: `${width}px` }} />
    </div>
  );
}
