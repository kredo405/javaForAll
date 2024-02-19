

const Main_card = (props) => {

    return (
        <>
        <div className="flex items-center lg:justify-center w-full">
        <div className="flex flex-col sm:flex-row w-full mt-16 items-center dark:bg-slate-800 justify-between bg-slate-50 p-3 border-2 rounded-2xl dark:border-slate-700 border-slate-100 border-solid">
          <div className={props.content ? 'order-first w-8/12 px-2 md:px-5' : 'sm:order-last w-8/12 px-2 md:px-5'}>
            <h2 className='mb-7 text-center dark:text-slate-200 text-lg lg:text-2xl'>{props.title}</h2>
            <p className='text-xm text-center dark:text-slate-200 lg:text-lg'>{props.text}</p>
          </div>
          <img className='lg:w-96 h-full w-6/12' src={props.img} alt="card" />
        </div>
      </div>  
       </> 
    )
}

export default Main_card;