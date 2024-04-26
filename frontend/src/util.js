export const scrollToLast = (scrollRef) => {
  if (scrollRef) {
    setTimeout(() => {
      const scrollContainer = scrollRef.current;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      scrollRef.current.scrollTop = maxScrollTop;
      // Smooth scrolling animation
      scrollContainer.scrollTo({
        top: maxScrollTop,
        behavior: "smooth",
      });
    }, 100); // Adjust the delay as needed
  }
};

