const createHelper = () => {
  const dateToInputTime = (date: Date) => (date.getHours() + ':' + date.getMinutes());

  const dateToInputDate = (date: Date) => (date.toISOString().substr(0, 10));

  const dateFromRaw = (rawData: string[] | null | undefined): Date | null => {
    if (rawData === null || rawData === undefined) {
      return null;
    }
    return new Date(`${rawData[0]}-${rawData[1]}-${rawData[2]} ${rawData[3]}:${rawData[4]}`);
  }

  return {
    dateToInputDate,
    dateToInputTime,
    dateFromRaw
  };
};

export default createHelper();