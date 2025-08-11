import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAccountModale from "../../components/profil/DeleteAccountModale";
import Input from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";

function AccountSettings() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [password_error, setPasswordError] = useState({});

  useEffect(() => {
    if (user) {
      setName(user.name);
      setFirstname(user.firstname);
      setEmail(user.email);
    }
  }, [user]);

  const UpdateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await axios.put(
        `http://localhost:8000/api/user/${user.id}`,
        {
          name,
          firstname,
          email,
          ...(password
            ? { password, password_confirmation, old_password: oldPassword }
            : {}),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/profil");
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      } else if (e.response && e.response.status === 401) {
        setPasswordError(e.response.data);
      } else {
        console.error("Erreur inattendue", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-row justify-center mb-8">
        <h1 className="text-gradient text-2xl w-fit">Account settings</h1>
      </div>

      <form onSubmit={UpdateUser}>
        <section className="flex flex-col md:flex-row justify-center gap-4 border border-primary mx-20 mb-8 p-4">
          <div>
            <p>Name</p>
            <Input
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
            {errors.name && <p className="text-danger">{errors.name[0]}</p>}
          </div>
          <div>
            <div>
              <p>Firstname</p>
              <Input
                type={"text"}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              ></Input>
              {errors.firstname && (
                <p className="text-danger">{errors.firstname[0]}</p>
              )}
            </div>
          </div>
          <div className="">
            <p>Email</p>
            <Input
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            {errors.email && <p className="text-danger">{errors.email[0]}</p>}
          </div>
        </section>

        <h2 className="text-lg font-bold text-left mx-20 my-4">
          Update password
        </h2>
        <section className="flex flex-col md:flex-row justify-center gap-4 border border-primary mx-20 mb-8 p-4">
          <div className="">
            <p>Previous password</p>
            <Input
              type={"password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            ></Input>
            {password_error.message && (
              <p className="text-danger">{password_error.message}</p>
            )}
          </div>

          <div className="">
            <p>New password</p>
            <Input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            {errors.password && (
              <p className="text-danger">{errors.password[0]}</p>
            )}
          </div>

          <div className="">
            <p>Repeat new password</p>
            <Input
              type={"password"}
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
            ></Input>
            {errors.password && (
              <p className="text-danger">{errors.password[0]}</p>
            )}
          </div>
        </section>

        <button
          className={`bg-primary rounded-md px-4 py-2 hover:scale-105 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Modifier les informations"}
        </button>
      </form>

      <section className="flex flex-row items-center justify-between border border-danger p-4 mx-20 my-4">
        <div className="flex justify-center items-center">
          <ExclamationTriangleIcon className="h-10 w-10 text-red-600 pr-2" />
          <p>This action is irreversible !</p>
        </div>
        <DeleteAccountModale></DeleteAccountModale>
      </section>
    </>
  );
}

export default AccountSettings;
