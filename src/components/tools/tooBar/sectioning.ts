import { ref } from "vue";
import {useToolsStore} from "@/stores/tools";

export function useSectioning(){
    const sectioningKey = ref('')

    const sectioningShow = ref(true)

    /**
     * 剖切点击事件
     */
    const sectioningClick = () => {

    }

    return {
        sectioningClick,
        sectioningShow,
        sectioningKey
    }
}