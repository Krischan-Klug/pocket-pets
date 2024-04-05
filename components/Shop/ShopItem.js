export default function ShopItem() {
  return (
    <>
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
