import { useStore } from '../../store/store';

export function DataTable() {
  const persons = useStore((state) => state.data);
  console.log('persons', persons);
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Password</th>
          <th>Gender</th>
          <th>Image</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.id}</td>
            <td>{person.name}</td>
            <td>{person.age}</td>
            <td>{person.email}</td>
            <td>{person.firstPassword}</td>
            <td>{person.gender}</td>
            <td>
              <img
                src={person.base64}
                style={{ width: 50, height: 50, objectFit: 'cover' }}
              />
            </td>
            <td>{person.country}</td>
          </tr>
        ))}
        <tr></tr>
      </tbody>
    </table>
  );
}
