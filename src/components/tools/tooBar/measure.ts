import { ref } from "vue";

export function useMeasure(){
    const activeKey = ref('1')

    return {
        activeKey
    }
}