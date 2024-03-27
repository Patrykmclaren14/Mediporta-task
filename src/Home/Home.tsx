import { Link } from "react-router-dom"

const Home = () => {
  return (
    <section className="grid place-items-center min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt=""
              src="/Developer.jpeg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Patryk Wierzbowski
            </h2>

            <p className="mt-4 text-gray-600">
              Hi Mediport Team, <br />
              <br />
              Thank you for providing me with the test task. I hope I met the
              expectations for this assignment and look forward to seeing you at
              the recruitment interview soon.
              <br />
              To create this task, I used technologies such as React,
              TypeScript, Redux, React-Router, Tailwind CSS, Hyper UI, MUI
              components, and Axios. <br />
              <br />
              To view the task, please click the button. <br /> <br />
              Best regards, <br />
              Patryk Wierzbowski
            </p>

            <Link
              to="/task"
              className="mt-8 inline-block rounded bg-indigo-600 px-12
                py-3 text-sm font-medium text-white transition hover:bg-indigo-700
                focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Check my task
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
