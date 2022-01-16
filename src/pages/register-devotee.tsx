import { trpc } from "@/utils/trpc"
import Head from "next/head"
import { Footer } from "../components/Footer"
import { Form, Registrant } from "../components/Form"
import Image from "next/image"
import toast from "react-hot-toast";
import { useEffect } from "react"

export default function RegisterDevotee() {
  const mutation = trpc.useMutation(['register.add'])

  useEffect(() => {
    if (mutation.error)
      toast.error(mutation.error.message, { position: 'bottom-right' })
  }, [mutation])

  const formSubmit = (registrant: Registrant) => mutation.mutateAsync(registrant)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Sri Lankaramaya Registry</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <div className="min-h-full w-3/4 flex items-center justify-center py-12 px-4 sm:px-6 sm:w-full lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="relative h-32 sm:h-200">
                <Image
                  src="/meditate.svg"
                  alt="meditate"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              {
                mutation.isSuccess
                  ? (
                    <div className="h-1/3 border rounded-md p-3 mt-20 sm:p-5">
                      <div className="divide-y divide-solid divide-gray-400">
                        <h2 className="pb-2 font-semibold">Thank you!</h2>
                        <div className="pt-5 text-sm h-32 text-left">
                          <p>Your data has now been saved in the Sri Lankaramaya devotee registry.</p>
                          <p className="mt-8 text-xs">You can safely now close this form</p>
                        </div>
                      </div>
                    </div>
                  )
                  : <Form onSubmit={formSubmit} />
              }
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
