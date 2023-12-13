import { useFetchUserAccountQuery } from "./userSlice";
import "./profile.less";

export default function Profile() {
  const { data: user, isLoading, isError } = useFetchUserAccountQuery();

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return;
  }
  return (
    <section className="profile-container">
      <div>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              {user.data.firstName} {user.data.lastName}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.data.email}</td>
          </tr>
          <tr>
            <td>UserName</td>
            <td>{user.data.username}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </section>
  );
  }