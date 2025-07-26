import { uiData, type IUser } from './helper';

const UsersList = () => {
  return (
    <ul className="flex flex-col gap-2">
      {uiData.map((user: IUser, index: number) => (
        <li className="flex items-center gap-2" key={index}>
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user.avatar}
            alt={user.name}
            loading="lazy"
          />
          <p className="text-sm font-medium">{user.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
