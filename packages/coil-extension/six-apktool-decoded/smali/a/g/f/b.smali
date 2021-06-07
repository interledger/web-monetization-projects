.class final La/g/f/b;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/util/concurrent/Callable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/g/f/f;->a(Landroid/content/Context;La/g/f/a;La/g/a/a/h$a;Landroid/os/Handler;ZII)Landroid/graphics/Typeface;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x8
    name = null
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Object;",
        "Ljava/util/concurrent/Callable<",
        "La/g/f/f$c;",
        ">;"
    }
.end annotation


# instance fields
.field final synthetic a:Landroid/content/Context;

.field final synthetic b:La/g/f/a;

.field final synthetic c:I

.field final synthetic d:Ljava/lang/String;


# direct methods
.method constructor <init>(Landroid/content/Context;La/g/f/a;ILjava/lang/String;)V
    .locals 0

    iput-object p1, p0, La/g/f/b;->a:Landroid/content/Context;

    iput-object p2, p0, La/g/f/b;->b:La/g/f/a;

    iput p3, p0, La/g/f/b;->c:I

    iput-object p4, p0, La/g/f/b;->d:Ljava/lang/String;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public call()La/g/f/f$c;
    .locals 4

    iget-object v0, p0, La/g/f/b;->a:Landroid/content/Context;

    iget-object v1, p0, La/g/f/b;->b:La/g/f/a;

    iget v2, p0, La/g/f/b;->c:I

    invoke-static {v0, v1, v2}, La/g/f/f;->a(Landroid/content/Context;La/g/f/a;I)La/g/f/f$c;

    move-result-object v0

    iget-object v1, v0, La/g/f/f$c;->a:Landroid/graphics/Typeface;

    if-eqz v1, :cond_0

    sget-object v2, La/g/f/f;->a:La/d/g;

    iget-object v3, p0, La/g/f/b;->d:Ljava/lang/String;

    invoke-virtual {v2, v3, v1}, La/d/g;->a(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;

    :cond_0
    return-object v0
.end method

.method public bridge synthetic call()Ljava/lang/Object;
    .locals 1

    invoke-virtual {p0}, La/g/f/b;->call()La/g/f/f$c;

    move-result-object v0

    return-object v0
.end method
