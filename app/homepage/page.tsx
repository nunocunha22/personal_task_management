import "../globals.css";
import Link from "next/link";


export default function Homepage() {
  return (
    <div>
      <article className="mb-6">
        <h2>Welcome to your Personal Task Manager!</h2>
        <br />

        <p>Stay organized and boost your productivity with our easy-to-use task manager. Whether you're tackling personal tasks, team projects, or daily to-dos, our app helps you stay on top of everything.
        </p>

        <p>Create tasks with just a few clicks.</p>
        <p>Track progress with customizable statuses.</p>
        <p>Stay organized with an intuitive task board.</p>
        <p>Take control of your tasks today, and never miss a deadline again.</p>
        <br />
        <p>Ready to get started? Click below to begin managing your tasks now!</p>
      </article>
      {/* <Link href="/homepage" className="text-white mr-4">
        Homepage
      </Link>
      <Link href="/taskboard" className="text-white mr-4">
        Task Board
      </Link>
      <Link href="/userprofile" className="text-white mr-4">
        User Profile
      </Link> */}
      <button className="bg-slate-700 text-white px-2 py-1 rounded ">
        <Link href="/taskboard" className="text-white">
          Get Started
        </Link>
      </button>
    </div>
  );
}
