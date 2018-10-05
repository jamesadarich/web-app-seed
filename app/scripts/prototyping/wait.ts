export async function wait(timeInMilliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, timeInMilliseconds));
}
