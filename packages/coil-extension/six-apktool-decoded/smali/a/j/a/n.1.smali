.class La/j/a/n;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/j/a/t;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/j/a/t;


# direct methods
.method constructor <init>(La/j/a/t;)V
    .locals 0

    iput-object p1, p0, La/j/a/n;->a:La/j/a/t;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 1

    iget-object v0, p0, La/j/a/n;->a:La/j/a/t;

    invoke-virtual {v0}, La/j/a/t;->n()Z

    return-void
.end method
