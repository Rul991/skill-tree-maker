import '@styles/index.less'
import { SkillTreeProvider } from '../providers/SkillTree'
import { CurrentIndexProvider } from '../providers/CurrentIndex'
import Nav from '../components/other/Nav'
import MainPanel from '../components/panels/MainPanel'
import SidePanel from '../components/panels/SidePanel'

const App = () => {
    return (
        <CurrentIndexProvider>
            <SkillTreeProvider>
                <Nav />
                <main>
                    <MainPanel />
                    <SidePanel />
                </main>
            </SkillTreeProvider>
        </CurrentIndexProvider>
    )
}

export default App