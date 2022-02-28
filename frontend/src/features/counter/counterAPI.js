export const fetchCount = (amount=1) => (
  new Promise(resolve =>
    setTimeout(() => resolve({ data: amount }), 500)
  )
)