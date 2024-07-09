// hook that merges multiple refs to one element
export default function useMergeRefs (...refs) {
    // return a callback function
    return node => {
        for (const ref of refs) {
            ref.current = node;
        }
    }
}