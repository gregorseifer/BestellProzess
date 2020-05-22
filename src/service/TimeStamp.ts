export function fn_getTimeStamp(): string {
    let now: Date = new Date();
    let time: Array<String> = [ String(now.getHours()), String(now.getMinutes()), String(now.getSeconds())];
    return time.join(":") + "\n";
}