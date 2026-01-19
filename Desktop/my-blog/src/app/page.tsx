import ThemeSwitch from './components/ThemeSwitch'
export default async function Home() {
  return (
    <div className="flex gap-20 p-[30px] items-center">
      <p className="text-orange-500 font-black text-3xl font-cafe24">
        Gyuri's Blog
      </p>
      <ThemeSwitch />
    </div>
  )
}
