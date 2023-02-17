import React, { useState } from "react";
import { useEffectOnce } from "react-use";
import { ListButton, LoadingRing, modal, Once, Pop } from "@/component";
import { Path } from "local";
import { _sets } from "@/method/_sets";
import { _shelf } from "@/method/_shelf";
import { _book } from "@/method/_book";
import { v } from "@/method/v";
import { toa } from "@/method/common";

export const DavContentPanel = () => {
  const [content, setContent] = useState<any[]>([]);
  useEffectOnce(() => {
    v.i("dav_content").then((res) => {
      setContent(res);
    });
  });

  return (
    <Once cs={"panel"}>
      <Once cs={"title"}>
        {_sets.value().sync.webdav.server + _sets.value().sync.webdav.root}
      </Once>
      {content.length === 0 ? (
        <LoadingRing />
      ) : (
        <Once cs={"body"}>
          {content.map((item, key) => {
            if (["txt", "epub"].includes(Path.parser(item.filename).ext))
              return (
                <ListButton
                  key={key}
                  primary={item.basename}
                  lc={toa(async () => {
                    Pop.close();
                    modal.close();
                    const { body } = await v.i("dav_download", item);
                    const mass = await _book.add(body);
                    await _shelf.load();
                    return mass;
                  })}
                />
              );
          })}
        </Once>
      )}
    </Once>
  );
};
