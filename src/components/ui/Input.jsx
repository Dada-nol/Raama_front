/**
 * Composant Input personnalisé avec styles prédéfinis.
 *
 * @param {Object} props
 * @param {string} props.type - Type de l'input (text, password, email, etc.).
 * @param {string} props.value - Valeur de l'input.
 * @param {string} props.placeholder - Texte affiché lorsque l'input est vide.
 * @param {function} props.onChange - Fonction appelée lors d'un changement de valeur.
 * @param {...Object} rest - Propriétés supplémentaires passées à l'input.
 *
 * @component
 *
 * @example
 * <Input
 *   type="text"
 *   value={name}
 *   placeholder="Nom"
 *   onChange={(e) => setName(e.target.value)}
 * />
 */

function Input({ type, value, placeholder, onChange, ...rest }) {
  return (
    <input
      className="w-full pl-10 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-primary"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
    />
  );
}

export default Input;
