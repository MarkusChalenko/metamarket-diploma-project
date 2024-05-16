import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";

import { Button } from "@/components/ui/button/Button";
import Description from "@/components/ui/description/Description";
import { Modal } from "@/components/ui/modal/Modal";
import { Picture } from "@/components/ui/picture/Picture";

import { Field } from "@/ui/field/Field";
import { Sign } from "@/ui/sign/Sign";

import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";
import { useItem } from "@/hooks/useItem";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";

import { TypeItem } from "@/shared/types/item.types";

import { erc721Contract } from "@/configs/contracts";

import { Meta } from "@/utils/meta/Meta";

import viewImage from "@/assets/images/view.svg";

import { walletArr } from "../auth/web3/wallet.data";
import { IItemInputAndController } from "../create/create.interface";

import styles from "./Card.module.scss";
import { IItemEditInput } from "./card.interface";
import { useItemEdit } from "./useItemEdit";
import { useUser } from "./useUser";

export const Card: FC = (): JSX.Element => {
  const { item } = useItem();
  const { back } = useRouter();
  const { account, web3 } = useWeb3Auth();
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isModalInputActive, setIsModalInputActive] = useState<boolean>(false);
  const [isModalFreezeDataActive, setIsModalFreezeDataActive] =
    useState<boolean>(false);

  const handleOnClose = () => setIsModalActive(false);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IItemEditInput>({
    mode: "onChange",
  });

  const { user } = useUser();

  const { onSubmit, isLoading, editedItem } = useItemEdit(setValue);

  const { loginInWeb3 } = useActions();

  const handleConnectWallet = async () => {
    loginInWeb3();
  };

  const mint = async () => {
    if (!web3) {
      console.error("no web 3");
      return;
    }

    const data = await erc721Contract(web3)
      .methods.mint(account, "some_uri")
      .send({ from: account });
  };

  return (
    <Meta title="Card Item" description="This is your unique item">
      <div className={styles.card}>
        <div>
          <div className="block row-span mb-8">
            <Picture appearance="image" url={`${item?.image_url}`} />
          </div>
          <div className="block row-span">
            <Picture appearance="image" url={item?.qr_url} />
          </div>
        </div>
        <div className={styles.information}>
          <h1 className="h2 mb-8">{item?.name}</h1>

          <div className={styles.description}>
            <label>
              <p>Description</p>
              <span>
                <Description text={item?.description || ""} />
              </span>
            </label>
          </div>

          <div className={styles.details}>
            <p>Details</p>
            <label>
              <p>Owner</p>
              <span>{account ? account : "empty"}</span>
            </label>
            <label>
              <p>Creator</p>
              <span>{user?.name}</span>
            </label>
            <label>
              <p>Blockchain</p>
              <span>{item?.currency}</span>
            </label>
            <label>
              <p>Token ID</p>
              <span>LKJFsahgsdfkjossoudOUYDGSOSDgoyuguossdf</span>
            </label>
            <label>
              <p>Original Prove Link</p>
              <span>
                {process.env.NFT_CHECK_URL}/{item?.nft_check_url}
              </span>
            </label>
            <label>
              <p>Product story</p>
              <span>{editedItem?.product_story}</span>
            </label>
          </div>

          <div className={styles.records}>
            <p>Item history records</p>

            <table>
              <tbody>
                <tr>
                  <th>CREATOR</th>
                  <th>AGE</th>
                  <th>ACTION</th>
                  <th>PHOTOS | VIDEOS</th>
                  <th>VIEW</th>
                </tr>

                <tr>
                  <th>Alex Tabs</th>
                  <th>1 min ago</th>
                  <th>Creation history</th>
                  <th>Yes | No</th>
                  <th>
                    <Link href="/">
                      <a className="flex items-center animate-fade">
                        <Image
                          src={viewImage}
                          width={30}
                          height={15}
                          alt="Unique Things"
                          draggable={false}
                        />
                      </a>
                    </Link>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <Button
              title="Go Back"
              appearance="large"
              className="btn-ghost"
              onClick={() => back()}
            />
            <Button
              title="Create NFT Digital Proof"
              appearance="large"
              className="btn-primary ml-8"
              onClick={() => setIsModalActive(true)}
            />
          </div>
        </div>
      </div>

      <Modal visible={isModalActive} onClose={handleOnClose}>
        <h1 className="h1 mb-4">Success</h1>
        <p className="text-2xl mb-4">
          NFT Digital Proof for Business <br /> card holder was created
        </p>
        <Button
          title="Create your first history record"
          appearance="small"
          className="btn-primary"
          onClick={() => {
            setIsModalInputActive(true);
            setIsModalActive(false);
          }}
        />
        <p className="font-light text-xl mt-4">
          You can{" "}
          <span onClick={mint} className="cursor-pointer">
            <a
              onClick={() => {
                setIsModalFreezeDataActive(true);
                setIsModalActive(false);
              }}
              className="text-primary pointer"
            >
              Freeze data into blockchain
            </a>
          </span>
        </p>
      </Modal>

      {isModalInputActive && (
        <Modal
          visible={isModalInputActive}
          onClose={() => setIsModalInputActive(false)}
        >
          <h3 className="h3 mb-4">Enter first history record</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="submit" hidden />
            <Field
              disabled={isLoading}
              placeholder="Product Story"
              {...register("product_story", {
                required: "Product story is required",
                minLength: {
                  value: 4,
                  message: "Link must be at least 4 characters",
                },
                maxLength: {
                  value: 28,
                  message: "Link must be less than 28 characters",
                },
              })}
              error={errors.product_story}
            />
          </form>
        </Modal>
      )}

      {!account && isModalFreezeDataActive && (
        <Modal
          visible={isModalFreezeDataActive}
          onClose={() => setIsModalFreezeDataActive(false)}
        >
          <h3 className="h3 mb-4">Connect Wallet</h3>
          <ul className={styles.sign}>
            {walletArr.map((item) => (
              <Sign
                item={item}
                key={item.link}
                appearance="extended"
                onClick={handleConnectWallet}
              />
            ))}
          </ul>
        </Modal>
      )}
    </Meta>
  );
};
