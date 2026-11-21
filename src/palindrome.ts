
// palindrome validation function
export function isPalindrome(str: string): boolean {
  let upstr: string = str.toUpperCase().replace(' ', '');
  // console.log(upstr)
  let i: number = 0;
  let j: number = upstr.length -1;
  while (i < j) {
    if (upstr[i] !== upstr[j]) {
        return false;
    }
    i++;
    j--;
  }
  return true
}
