export default function InputField({ text }) {
  return (
    <>
      <label htmlFor="name">Name: </label>
      <input type="text" id="name" name="name" defaultValue={name} required />
    </>
  );
}
