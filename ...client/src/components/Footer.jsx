import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

export default function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-cyan-300">
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <Link to="/" className='self-center whitespace-nowrap text-sm font-semibold dark:text-white'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                        MERN
                    </span>
                        BLOG
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                    <Footer.Title title='About'/>
                    <Footer.LinkGroup col>
                        <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer'>
                            Google
                        </Footer.Link>
                        <Footer.Link href='/projects' target='_blank' rel='noopener noreferrer'>
                            Projects
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                    <Footer.Title title='About'/>
                    <Footer.LinkGroup col>
                        <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer'>
                            Google
                        </Footer.Link>
                        <Footer.Link href='/projects' target='_blank' rel='noopener noreferrer'>
                            Projects
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                    <Footer.Title title='About'/>
                    <Footer.LinkGroup col>
                        <Footer.Link href='https://www.google.com' target='_blank' rel='noopener noreferrer'>
                            Google
                        </Footer.Link>
                        <Footer.Link href='/projects' target='_blank' rel='noopener noreferrer'>
                            Projects
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                
            </div>
            <Footer.Divider/>
            <Footer.Copyright by='MERN BLOG' year={new Date().getFullYear()}/>
        </div>
        
    </Footer>
  )
}
