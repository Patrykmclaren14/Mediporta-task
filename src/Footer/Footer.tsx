import NavigationLink from "../NavigationLink"
import { Navigation } from "../placeholder/Navigation"

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
          Hello :)
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {Navigation.map(([path, name], index) => (
            <li key={index}>
                <NavigationLink path={path} name={name} />
              </li>
            ))}
        </ul>

        <div className="mt-12 flex justify-center gap-6 md:gap-8">
          <a
            href="/https://github.com/Patrykmclaren14"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 transition hover:text-gray-700/75"
          >
            <img src={`${process.env.PUBLIC_URL}/github.svg`} alt="github" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
