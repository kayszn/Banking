import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link"
import { Button } from "./ui/button"
import { useCallback, useEffect, useState } from "react"
import { StyledString } from "next/dist/build/swc/types";
import { useRouter } from "next/navigation";
import { createLinkToken } from "@/lib/actions/user.action";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();

    const [token, setToken] = useState("");

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string | null) => {
        // await exchangePublicToken({
        //     publicToken: public_token,
        //     user,
        // })

        router.push("/");
    }, [user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess,
    }

    const {open, ready} = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button onClick={() => open()} disabled={!ready} className="plaidlink-primary">
            Connect bank
        </Button>
      ): variant === "ghost" ? (
        <Button onClick={() => open()}>
            Connect bank
        </Button>
      ): (
        <Button>
            Connect bank
        </Button>
      )}
    </>
  )
}

export default PlaidLink