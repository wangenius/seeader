import React, {useState} from "react";
import {useEffectOnce} from "react-use";
import {app} from "@/method/app";
import {ListButton, LoadingRing, modal, Once, Pop} from "@/component";
import {Path} from "local";
import {toast} from "react-toastify";
import i18n from "i18next";
import {_sets} from "@/data/method/_sets";
import {_shelf} from "@/data/method/_shelf";
import {_book} from "@/data/method/_book";

export const DavContentPanel = () => {
    const [content, setContent] = useState<any[]>([]);
    useEffectOnce(() => {
        app("dav_content").then((res) => {
            setContent(res);
        });
    });

    return (
        <Once cs={"panel"}>
            <Once cs={"title"}>
                {_sets.value().sync.webdav.server + _sets.value().sync.webdav.root}
            </Once>
            {content.length === 0 ? (
                <LoadingRing/>
            ) : (
                <Once cs={'body'}>
                    {content.map((item, key) => {
                        if (["txt", "epub"].includes(Path.parser(item.filename).ext))
                            return (
                                <ListButton
                                    key={key}
                                    primary={item.basename}
                                    lc={async () => {
                                        Pop.close();
                                        modal.close();
                                        const res = await app("dav_download",item);
                                        await _book.add(res.filepath).then(_shelf.load);
                                        toast.success(i18n.t("add successfully"));
                                    }}
                                />
                            );
                    })}
                </Once>
            )}
        </Once>
    );
};