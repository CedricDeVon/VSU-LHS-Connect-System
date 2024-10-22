
export default defineEventHandler(async () => {
  const mail = useMail()

  mail.send({
    from: 'John Doe',
    to: 'vaughncedriclipardoaraneta@gmail.com',
    subject: 'Incredible',
    text: 'This is an incredible test message',
  })
})