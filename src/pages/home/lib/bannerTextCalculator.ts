export const bannerTextCalculator = (offsetWidth: number, bannerText: string): Array<string> => {
  const vpWidth = document.documentElement.clientWidth;

  // 복제할 텍스트 개수 구하기
  let count = 1;
  let totalWidth = offsetWidth;

  while (totalWidth < vpWidth + offsetWidth) {
    totalWidth += offsetWidth;
    count++;
  }

  // 텍스트 복제
  return Array(count).fill(bannerText);
};
