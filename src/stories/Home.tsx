import PropTypes from 'prop-types';

const Home = ({size} : any) => {
  return (
    <section className="grid place-items-center min-h-screen">
      <div className={`mx-auto max-w-screen-xl px-4 py-8  ${size === 'lg' ? 'lg:px-8 lg:py-16' : 'sm:px-6 sm:py-12'}`}>
        <div className={`grid gap-8 ${size === 'lg' ? 'lg:grid-cols-2 lg:gap-16' : 'grid-cols-1'}`}>
          <div className={`relative h-64 overflow-hidden rounded-lg ${size === 'lg' ? 'lg:order-last lg:h-full' : 'sm:h-80'}`}>
            <img
              alt="Developer"
              src={`/Developer.jpeg`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className={`${size === 'lg' ? 'lg:py-24' : '' }`}>
            <h2 className={`text-3xl font-bold ${size === 'sm' ? 'sm:text-4xl' : 'text-5xl' }`}>
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

            <a
              href="/task"
              className={`mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400 ${size === 'sm' ? 'text-xs py-2' : size === 'lg' ? 'text-lg py-4' : ''}`}
            >
              Check my task
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Home;
