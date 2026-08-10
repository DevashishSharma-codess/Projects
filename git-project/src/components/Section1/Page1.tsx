import LeftContent from './LeftContent'
import RightContent from './RightContent'

const Page1 = () => {
  return (
    <div className='w-full min-h-[calc(100vh-85px)] flex flex-col lg:flex-row items-stretch justify-between bg-black overflow-hidden'>
      <LeftContent />
      <RightContent />
    </div>
  )
}

export default Page1