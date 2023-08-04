import { Link } from "@inertiajs/react";

const Navbar = ({ user }) => {
    console.log(user);
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Rama News</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-24 md:w-auto"
                    />
                </div>
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img src="https://picsum.photos/200/200" />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                        { !user ?
                        <>
                            <li>
                                <Link href={route('login')} as="button">Login</Link>
                            </li>
                            <li>
                                <Link href={route('register')} as="button">Register</Link>
                            </li>
                        </>
                         :
                        <>
                            <li>
                                <Link href={route('dashboard')} className="justify-between" as="button">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link as="button">Settings</Link>
                            </li>
                            <li>
                                <Link href={route('logout')} method="post" as="button">Logout</Link>
                            </li>
                        </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
